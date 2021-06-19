defmodule PhxLab.SclStop.PredictionWatcher do
  # https://thoughtbot.com/blog/long-lived-processes-in-elixir
  # https://elixirforum.com/t/endless-recursion/10683/6

  alias PhxLab.SclStop.Prediction
  alias PhxLab.SclStop.KV.StopPredictionKV
  alias PhxLab.SclStop.KV.StopProcPidKV

  def run(stop_code) do
    result_prediction = Prediction.get_prediction(stop_code)

    case result_prediction do
      {:ok, result} ->
        StopPredictionKV.insert(stop_code, result)
        PhxLabWeb.Endpoint.broadcast("scl_stop/stop:#{stop_code}", "stop_prediction", result)
    end

    Process.sleep(10_000)
    run(stop_code)
  end

  def start_process(stop_code) do
    result = StopProcPidKV.find(stop_code)

    case result do
      {:not_found} ->
        pid = spawn(__MODULE__, :run, [stop_code])
        StopProcPidKV.insert(stop_code, pid)
    end
  end

  def kill_process(stop_code) do
    result = StopProcPidKV.find(stop_code)

    case result do
      {:ok, pid} ->
        StopProcPidKV.delete(stop_code)
        # https://elixirforum.com/t/how-do-i-kill-a-process-pid-0-186-0-in-iex/4491/9
        Process.exit(pid, :kill)
    end
  end
end
