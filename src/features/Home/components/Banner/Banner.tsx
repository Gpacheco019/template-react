import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { bannerStyles } from './Banner.styles';

const ellipseUrl = '/ellipse.svg';
const ellipseMaskUrl = '/mask-elipse.svg';

export interface BannerProps {
  avatarUrl?: string;
  name: string;
}

export const Banner = ({ avatarUrl, name }: BannerProps) => {
  return (
    <div className={bannerStyles.container}>
      <div className={bannerStyles.content}>
        <div className={bannerStyles.avatar}>
          <Avatar className='w-24 h-24 rounded-full border-4 border-[#62caab]'>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className={bannerStyles.textContainer}>
          <h1 className={bannerStyles.title}>Hello, {name}!</h1>
          <p className={bannerStyles.description}>
            Here you can see all your scheduled shifts, check for biddings
            opportunities and much more
          </p>
        </div>
      </div>

      <img
        src={ellipseUrl}
        alt='Ellipse decoration'
        className='
          absolute top-5 -right-7 bottom-0 w-60 h-90 z-0 opacity-40
          sm:-top-5 sm:right-5 sm:w-60 sm:h-80
          md:-top-20 md:right-15 md:w-40 md:h-90
          xl:-top-2 xl:right-70 xl:w-90 xl:h-80
        '
      />

      <img
        src={ellipseMaskUrl}
        alt='Ellipse mask'
        className='
          absolute -top-5 -right-30 bottom-0 z-0 opacity-40
          sm:-top-25 sm:-right-10 sm:w-40 sm:h-70
          md:-top-30 md:-right-5 md:w-40 md:h-80
          xl:-top-35 xl:right-50 xl:w-60 xl:h-80
        '
      />
    </div>
  );
};
