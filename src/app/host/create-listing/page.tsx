import FormCreateListing from './ui/FormCreateListing'

export default function CreateListingPage() {
  return (
    <section className="max-w-[1500px] mx-auto mt-4">
      <h1 className="text-4xl font-bold text-primary">Create Booking</h1>
      <FormCreateListing />
    </section>
  )
}
