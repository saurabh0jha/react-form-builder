import { ManagedForm } from './components/ManagedForm/ManagedForm'
import { FormListing } from './components/FormListing/FormListing'
import Header from './components/Header/Header'
import './styles/App.css'

function App() {

  return (
    <>
      <Header />
      <FormListing data={[{
        name: "Demo",
        description: "First demo",
        createdAt: "20 Feb 2025 14:00",
        stats: {
          fieldCount: 8,
          usageCount: 100,
        },
        schema:{
          version: "1.0.0",
          elements: []
        }

      }]} />
      <ManagedForm managedForm={undefined} />
    </>
  )
}

export default App
