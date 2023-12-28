import { AppRouter } from '../router/AppRouter'

import Menu from '../components/menu.component'
import Header from '../components/header.component'

export const Home = () => {
  return (
    <div>
      <div className='flex'>
        <Menu></Menu>
        <div className='w-full h-full grow'>
          <Header></Header>
          <AppRouter></AppRouter>
        </div>
      </div>
    </div>
  )
}
