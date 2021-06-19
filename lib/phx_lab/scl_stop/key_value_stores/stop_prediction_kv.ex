defmodule PhxLab.SclStop.KV.StopPredictionKV do
  use GenServer

  @table_name :stop_prediction

  def init(_) do
    table_pid = :ets.new(@table_name, [:set, read_concurrency: true])

    {:ok, table_pid}
  end

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  def insert(key, value), do: GenServer.cast(__MODULE__, {:insert, {key, value}})

  def find(key), do: GenServer.call(__MODULE__, {:find, key})

  def delete(key), do: GenServer.cast(__MODULE__, {:delete, key})

  def handle_cast({:insert, {key, value}}, pid) do
    :ets.insert(pid, {key, value})
    {:noreply, pid}
  end

  def handle_cast({:delete, key}, pid) do
    :ets.delete(pid, key)
    {:noreply, pid}
  end

  def handle_call({:find, key}, _from, pid) do
    case :ets.lookup(pid, key) do
      [{_, value} | _] ->
        {:reply, {:ok, value}, pid}

      [] ->
        {:reply, {:not_found}, pid}

      _ ->
        {:reply, {:error}, pid}
    end
  end
end
