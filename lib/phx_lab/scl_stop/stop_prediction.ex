defmodule PhxLab.SclStop.Prediction do
  import SweetXml

  @ws_url "http://ws13.smsbus.cl/wspatentedos/services/PredictorParaderoServicioWS"

  @headers [
    {"Content-Type", "application/xml"},
    {"SOAPAction", ""}
  ]

  def get_prediction(stop_code) do

    IO.puts("FETCHING DATA FROM STOP: #{stop_code}")

    xml_body = ~s"""
    <soapenv:Envelope
      xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:pred="http://predParaderoServicioWS.ws.simtws.wirelessiq.cl">
      <soapenv:Header/>
      <soapenv:Body>
        <pred:predictorParaderoServicio>
          <pred:paradero>#{stop_code}</pred:paradero>
          <pred:servicio></pred:servicio>
          <pred:cliente>0</pred:cliente>
          <pred:resolucion></pred:resolucion>
          <pred:ipUsuarioFinal></pred:ipUsuarioFinal>
          <pred:webTransId></pred:webTransId>
        </pred:predictorParaderoServicio>
      </soapenv:Body>
    </soapenv:Envelope>
    """

    case HTTPoison.post(@ws_url, xml_body, @headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        result =
          body
          |> SweetXml.xmap(
            predictions: [
              ~x"//item"l,
              service_code: ~x"./servicio/text()"s,
              service_response: ~x"./respuestaServicio/text()"s,
              response_code: ~x"./codigorespuesta/text()"s,
              bus_distance_1: ~x"./distanciabus1/text()"I,
              bus_distance_2: ~x"./distanciabus2/text()"I,
              bus_prediction_1: ~x"./horaprediccionbus1/text()"s,
              bus_prediction_2: ~x"./horaprediccionbus2/text()"s,
              bus_plate_1: ~x"./ppubus1/text()"s,
              bus_plate_2: ~x"./ppubus2/text()"s
            ]
          )

        {:ok, result}

      _ ->
        {:error, ""}
    end
  end
end
