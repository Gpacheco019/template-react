import { useShallow } from 'zustand/react/shallow';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useStore } from '@/app/store';
import { useForm } from 'react-hook-form';

export function UserProfile() {
  
  const { user, setUserName } = useStore(useShallow(state => ({
    user: state.user.data,
    setUserName: state.user.setUserName,
  })));

  const { register, handleSubmit } = useForm({
    defaultValues: {
      useName: user.useName,
    },
  });

  const handleSubmitForm = handleSubmit(formData => {
    setUserName(formData.useName);
  });

  return (
    <div className='flex flex-col gap-2 items-center'>
      <Avatar>
        <AvatarImage src={`https://github.com/${user.useName}.png`} alt={`@${user.useName}`} />
        <AvatarFallback>{user.useName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <form className='flex gap-2 flex-col' onSubmit={handleSubmitForm}>
        <Input {...register('useName')} />
        <Button>Save</Button>
      </form>
    </div>
  );
}