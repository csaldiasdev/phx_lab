defmodule PhxLabWeb.PageView do
  use PhxLabWeb, :view

  def render("pwa.html", _assigns) do
    Path.join(:code.priv_dir(:phx_lab), "static/build/index.html")
    |> File.read!()
    |> raw()
  end
end
