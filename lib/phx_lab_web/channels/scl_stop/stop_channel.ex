defmodule PhxLabWeb.Channels.SclStop.StopChannel do
  use Phoenix.Channel
  alias PhxLabWeb.Presence
  alias PhxLab.SclStop.PredictionWatcher
  alias PhxLab.ChannelWatcher

  def join("scl_stop/stop:" <> stop_code, _payload, socket) do
    # https://stackoverflow.com/a/33941469
    :ok =
      ChannelWatcher.monitor(
        :stop,
        self(),
        {__MODULE__, :leave, [stop_code, socket]}
      )

    send(self(), {:after_join, stop_code})

    {:ok, socket}
  end

  def handle_info({:after_join, stop_code}, socket) do
    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id, %{
        online_at: inspect(System.system_time(:second))
      })

    if users_in_channel(socket) === 1 do
      IO.puts("START PREDICTION FOR STOP: #{stop_code}")
      PredictionWatcher.start_process(stop_code)
    end

    {:noreply, socket}
  end

  def handle_in("ping", _payload, socket) do
    {:reply, {:ok, %{ping: "pong"}}, socket}
  end

  def leave(stop_code, socket) do
    if users_in_channel(socket) === 0 do
      IO.puts("STOP PREDICTION WITH STOP CODE: #{stop_code}")
      PredictionWatcher.kill_process(stop_code)
    end
  end

  defp users_in_channel(socket) do
    Presence.list(socket) |> map_size
  end
end
