import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { useState } from "react"

export const ReposicionPagina = () => {
  const [listProducts, setListProducts] = useState([])

  const handleSearchProduct = () => {

  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-medium mb-3">Reposición</h2>

      <Card className='!shadow-none border mb-5'>
        <form onSubmit={handleSearchProduct}>
          <div className='flex gap-3'>
            <InputText placeholder='Artículo o código de barras' className='p-inputtext-sm w-full' required />
            <Button label='Agregar' type='submit' size='small'></Button>
          </div>
        </form>
      </Card>

      <Card className='!shadow-none border'>
        <DataTable value={listProducts} stripedRows emptyMessage='No hay productos cargados' size='small'>
          <Column field='' header='Producto' className='rounded-tl-md' style={{ width: '15%' }} />
          <Column field='' header='Código' style={{ width: '15%' }} />
          <Column field='' header='Origen' style={{ width: '15%' }} />
          <Column field='' header='Destino' style={{ width: '55%' }} />
        </DataTable>
      </Card>
    </div>
  )
}