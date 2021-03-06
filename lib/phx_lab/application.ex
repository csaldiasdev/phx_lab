defmodule PhxLab.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      PhxLabWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: PhxLab.PubSub},
      # Start the Endpoint (http/https)
      PhxLabWeb.Endpoint,
      # Start a worker by calling: PhxLab.Worker.start_link(arg)
      # {PhxLab.Worker, arg}

      # PRESENCE ==============================
      PhxLabWeb.Presence,

      # SCL STOP CONFIGS ======================
      {PhxLab.ChannelWatcher, :stop},
      PhxLab.SclStop.KV.StopPredictionKV,
      PhxLab.SclStop.KV.StopProcPidKV
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhxLab.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PhxLabWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
