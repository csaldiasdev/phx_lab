defmodule PhxLab.SclStop.PredictionWatcher do
  # https://thoughtbot.com/blog/long-lived-processes-in-elixir
  # https://elixirforum.com/t/endless-recursion/10683/6

  alias PhxLab.SclStop.Prediction
  alias PhxLab.SclStop.KV.StopPredictionKV
  alias PhxLab.SclStop.KV.StopProcPidKV

  def run(stop_code) do
    case Prediction.get_prediction(stop_code) do
      {:ok, result} ->
        StopPredictionKV.insert(stop_code, result)
        PhxLabWeb.Endpoint.broadcast("scl_stop/stop:#{stop_code}", "stop_prediction", result)
    end

    Process.sleep(10_000)
    run(stop_code)
  end

  def start_process(stop_code) do
    IO.puts("START PREDICTION FOR STOP: #{stop_code}")
    pid = spawn(__MODULE__, :run, [stop_code])
    StopProcPidKV.insert(stop_code, pid)
  end

  def kill_process(stop_code) do
    case StopProcPidKV.find(stop_code) do
      {:ok, pid} ->
        IO.puts("STOP PREDICTION WITH STOP CODE: #{stop_code}")
        StopProcPidKV.delete(stop_code)
        # https://elixirforum.com/t/how-do-i-kill-a-process-pid-0-186-0-in-iex/4491/9
        Process.exit(pid, :kill)

      {:not_found} ->
        IO.puts("WORKER FOR STOP #{stop_code} NOT FOUND")
    end
  end

  def running_process(stop_code) do
    case StopProcPidKV.find(stop_code) do
      {:ok, _} -> true
      _ -> false
    end
  end
end
