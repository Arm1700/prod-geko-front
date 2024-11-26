import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const lngs = {
    en: { nativeName: 'English', flag: '/images/USA-flag.png' },
    am: { nativeName: 'Armenian', flag: '/images/Armenia-flag.jpg' },
    ru: { nativeName: 'Russian', flag: '/images/Russia-flag.png' },
  };

  const { i18n } = useTranslation();

  return (
      <div className='bg-white rounded '>
        {/*{Object.keys(lngs).map((lng) => (*/}
        {/*  <button*/}
        {/*    key={lng}*/}
        {/*    type="submit"*/}
        {/*    onClick={() => i18n.changeLanguage(lng)}*/}
        {/*    title={lngs[lng].nativeName}*/}
        {/*    className={`w-[35px] m-[3px] p-1 ${*/}
        {/*      i18n.resolvedLanguage === lng ? 'bg-secondary rounded ' : ''*/}
        {/*    }`}*/}
        {/*  >*/}
        {/*    <img alt={lngs[lng].nativeName} src={lngs[lng].flag}/>*/}
        {/*  </button>*/}
        {/*))}*/}
        <button
            key={'am'}
            type="submit"
            onClick={() => i18n.changeLanguage('am')}
            title={lngs['am'].nativeName}
            className={`w-[35px] m-[3px] p-1 ${
                i18n.resolvedLanguage === 'am' ? 'bg-secondary rounded ' : ''
            }`}
        >
          <img alt={'Armenian'} src={lngs['am'].flag}/>
        </button>
      </div>
  );
}