import { Calculator } from '@/components/Calculator'
import { ResultsTables } from '@/components/ResultsTables'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <Calculator />
      <ResultsTables />
    </main>
  )
}
