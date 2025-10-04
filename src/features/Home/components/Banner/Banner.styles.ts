export const bannerStyles = {
  container: [
    // Base styles
    'p-5 h-[15rem] w-full h-full bg-linear-to-r from-[#15B69A] to-primary overflow-hidden relative',
  ].join(' '),

  content: [
    // Base styles
    'h-full w-full flex flex-col gap-5 items-center justify-center z-10',
    // Responsive styles
    'sm:container sm:mx-auto sm:px-10 sm:flex-row sm:items-center sm:justify-start',
  ].join(' '),

  avatar: ['shadow-sm rounded-full z-10'].join(' '),

  textContainer: [
    // Base styles
    'w-full text-center space-y-4 text-white flex flex-col items-center justify-start z-10',
    // Responsive styles
    'sm:w-[30rem] sm:text-left sm:items-start',
  ].join(' '),

  title: ['text-4xl font-bold tracking-tight'].join(' '),

  description: [
    'hidden sm:block text-lg max-w-2xl mx-auto sm:mx-0 font-normal leading-normal',
  ].join(' '),
};
