const CreateListing = () => {
  return (
    <main className='max-w-4xl mx-auto p-3'>
      <h1 className='text-3xl font-bold text-center my-7'>Create a Listing</h1>

      <form className='flex flex-col gap-3 sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            id='name'
            maxLength={62}
            minLength={10}
            required
            className={`border rounded-lg p-3`}
          />
          <textarea
            type='text'
            placeholder='Description'
            id='description'
            required
            className={`border rounded-lg p-3`}
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            required
            className={`border rounded-lg p-3`}
          />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sell' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-3 items-center'>
              <input
                type='number'
                id='bedrooms'
                min={1}
                max={10}
                required
                className='border rounded-lg p-3'
              />
              <span>Beds</span>
            </div>
            <div className='flex gap-3 items-center'>
              <input
                type='number'
                id='bathrooms'
                min={1}
                max={10}
                required
                className='border rounded-lg p-3'
              />
              <span>Baths</span>
            </div>
          </div>

          <div className='flex gap-3 items-center'>
            <input
              type='number'
              id='regularPrice'
              min={100}
              max={10000000}
              className='border rounded-lg p-3'
            />
            <div>
              <p>Regular Price</p>
              <span className='text-xs'>($ / Month)</span>
            </div>
          </div>

          <div className='flex gap-3 items-center'>
            <input
              type='number'
              id='discountPrice'
              min={100}
              max={10000000}
              className='border rounded-lg p-3'
            />
            <div>
              <p>Discount price</p>
              <span className='text-xs'>($ / Month)</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <p className='font-semibold'>
            Images:{' '}
            <span className='font-normal text-gray-600 ml-1'>
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className='flex justify-between gap-4 my-5'>
            <input
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='border border-gray-300 p-3'
            />
            <button className='border border-green-700 text-green-700 p-3 hover:bg-green-100 disabled:opacity-50'>
              UPLOAD
            </button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-50'>
            create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
