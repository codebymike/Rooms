import Card from '../components/Card'

export default function Collection({items}) {
    // console.log(items)
    return (
        <div className='flex flex-wrap -mx-1 lg:-mx-4 space-x-8'>
            {items.map( (item, i) => (
                <Card key={i} item={item} />
            ))}
        </div>
    )
  }