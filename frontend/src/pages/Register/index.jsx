import { SignUpForm } from '../../components/Form.jsx'
import { SectionOverlay } from '../../components/Section.jsx'

export const Register = () => {
  return (
    <>
      <SectionOverlay className={'form'}
        sectionTitle={'Sign Up'}>
        <SignUpForm />
      </SectionOverlay>
    </>
  )
}
