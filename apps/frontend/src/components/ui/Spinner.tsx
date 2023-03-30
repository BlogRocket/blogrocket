import cn from 'clsx';

type SpinnerProps = {
  light?: boolean;
}

export default function Spinner({ light }: SpinnerProps) {
  const classes = cn('br-spinner', {
    'br-spinner--light-bg': light,
    'br-spinner--dark-bg': !light,
  })

  return (
    <span className={classes} />
  )
}