import Skeleton from '@mui/material/Skeleton';

export const ProfileSk = () => {
  return (
    <Skeleton variant="rounded" width={200} height={70} sx={{ bgcolor: 'grey.900' }}/>
  );
}

export const ProfileSk2 = () => {
  return (
    <div className='overflow-hidden'>
      <Skeleton variant="rounded" width={700} height={250} sx={{ bgcolor: 'grey.900' }}/>
    </div>
  );
}

export const ProfileSk3 = () => {
  return (
        <div className='flex'>
          <Skeleton variant="rounded" width={200} height={200} sx={{ bgcolor: 'grey.900' }}/>
        </div>
  );
}

export const HomeSk = () => {
  return (
    <div className="flex overflow-x-auto pb-5">
      <div className='flex gap-3 sm:gap-4'>
        <Skeleton variant="rounded" width={400} height={200} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rounded" width={400} height={200} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rounded" width={400} height={200} sx={{ bgcolor: 'grey.900' }}/>
      </div>
    </div>
  );
}

export const HomeSk2 = () => {
  return (
    <div>
      <Skeleton variant="text" sx={{ fontSize: '2rem', bgcolor: 'grey.900' }} />
      <div className="flex pt-5 overflow-x-auto pb-5 shrink-0">
        <div className='flex gap-3 sm:gap-5'>
          <div className='flex gap-2 items-center'>
            <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
            <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: 'grey.900' }}/>
          </div>
          <div className='flex gap-2 items-center'>
            <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
            <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: 'grey.900' }}/>
          </div>
          <div className='flex gap-2 items-center'>
            <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
            <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: 'grey.900' }}/>
          </div>
        </div>
      </div>
      <Skeleton variant="text" sx={{ fontSize: '2rem', bgcolor: 'grey.900' }} />
      <div className="flex pt-5 overflow-x-auto pb-5 shrink-0">
        <div className='flex gap-3 sm:gap-5'>
          <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
          <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
          <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
        </div>
      </div>
    </div>
  );
}

export const HomeSk3 = () => {
  return (
      <div className='flex gap-3 sm:gap-4 flex-wrap justify-center'>
        <Skeleton variant="rounded" width={500} height={200} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rounded" width={500} height={200} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rounded" width={500} height={200} sx={{ bgcolor: 'grey.900' }}/>
        <Skeleton variant="rounded" width={500} height={200} sx={{ bgcolor: 'grey.900' }}/>
      </div>
  );
}

export const SettingsSk = () => {
  return (
    <div className='flex pt-2'>
      <Skeleton variant="rounded" width={2000} height={100} sx={{ bgcolor: 'grey.900' }}/>
    </div>
  );
}

export const CollectionsSk = () => {
  return (
    <div className='flex pt-2 flex-col'>
      <Skeleton variant="text" sx={{ fontSize: '2rem', bgcolor: 'grey.900' }} />
      <div className="flex pt-5 overflow-x-auto pb-5 shrink-0">
        <div className='flex gap-3 sm:gap-5'>
          <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
          <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
        </div>
      </div>
    </div>
  );
}

export const BookSk = () => {
  return (
      <Skeleton variant="rounded" width={128} height={205} sx={{ bgcolor: 'grey.900' }}/>
  );
}