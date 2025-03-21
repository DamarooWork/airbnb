import FormCreateListing from './ui/FormCreateListing'

export default function CreateListingPage() {
  return (
    <section className="flex justify-center items-center flex-col max-w-[1500px] mx-auto">
      <h1 className="text-4xl font-bold text-primary">Create Booking</h1>
      <FormCreateListing />
    </section>
  )
}
