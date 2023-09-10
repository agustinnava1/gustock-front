import { Card } from 'primereact/card';
import { Component } from "react"
import { LocalService } from "../services/local.service";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      locales: []
    };
    this.localService = new LocalService();
  }

  componentDidMount() {
    this.localService.getAll().then(data => {
      this.setState({ locales: data })
    })
  }

  render() {

    const locales = this.state.locales.filter(local => local.tipo === 'LOCAL');
    const depositos = this.state.locales.filter(deposito => deposito.tipo === 'DEPOSITO');

    return (
      <div className="container mx-auto">
        <div>
          <h1 className="text-[42px] my-5">Mis Locales</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locales.map(local => (
              <Card title={local.nombre}>
                <p>Dirección: {local.direccion}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-[42px] my-5">Mis Depósitos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {depositos.map(deposito => (
              <Card title={deposito.nombre}>
                <p>Dirección: {deposito.direccion}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
