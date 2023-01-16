import FormElement from 'components/Form/Form';
import Section from 'components/Section/Section';

export default function App() {
  const onFormDataReceive = data => {
    console.log(data);
  };

  return (
    <>
      <Section title="Замовити переклад або редагування">
        <FormElement onSubmit={onFormDataReceive} />
      </Section>
    </>
  );
}
