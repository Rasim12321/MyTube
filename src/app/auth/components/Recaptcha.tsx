import type { ForwardedRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from '../styles.module.css'

export default function Recaptcha({ ref }: { ref: ForwardedRef<ReCAPTCHA> }) {
  return (
    <div className='mt-7 min-h-[80px]'>
      <ReCAPTCHA
        ref={ref}
        size='normal'
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        theme='light'
        className={styles.recaptcha}
      />
    </div>
  )
}
