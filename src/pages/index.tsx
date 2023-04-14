import { Calculator } from '@/components/Calculator'
import { ResultsTables } from '@/components/ResultsTables'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen'>
      <div className='w-11/12 my-10 md:w-1/2 md:flex md:flex-col md:justify-center md:overflow-x-auto'>
        <Calculator />
        <ResultsTables />
      </div>
    </main>
  )
}
