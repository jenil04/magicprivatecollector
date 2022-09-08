import { useRouter } from 'next/router'
import NFTDetailPage from '../../components/NFTDetailPage'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  const nft = {}
  return (
    <div className="bg-white">

      <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <NFTDetailPage nft = {nft} />
      </main>

    </div>

  )
}
