# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :phx_lab, PhxLabWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "PW3wGv9VuV03JlLYnIFZnVfBMX4B+irvHaL+6yn8+esUikNb7XAuoxGQUXO16h9x",
  render_errors: [view: PhxLabWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: PhxLab.PubSub,
  live_view: [signing_salt: "ad2U9D8K"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
