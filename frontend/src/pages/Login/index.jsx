import { LogInForm } from '../../components/Form.jsx'
import { SectionOverlay } from '../../components/Section.jsx'

export const Login = () => {
  return (
    <>
      <SectionOverlay className={'form'}
        sectionTitle={'Log In '}>
        <LogInForm />
      </SectionOverlay>
    </>
  )
}
