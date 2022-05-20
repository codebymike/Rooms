import Button from '../components/Button'

export default function Card({item}) {
    console.log(item);
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={`https://ipfs.infura.io/ipfs/${item.ipfsHash}`} alt="" />
            </a>
            <div className="p-5">
                <p>#{item.id}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.metadata.name}
                </h5>
                <Button>
                    List for Sale
                </Button>
            </div>
        </div>
    )
  }