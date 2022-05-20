import Card from '../components/Card'

export default function Collection({items}) {
    // console.log(items)
    return (
        <div>
            {items.map( (item, i) => (
                <Card key={i} item={item} />
            ))}
        </div>
    )
  }