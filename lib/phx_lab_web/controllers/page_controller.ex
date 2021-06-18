defmodule PhxLabWeb.PageController do
  use PhxLabWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
