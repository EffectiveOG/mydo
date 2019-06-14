import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Message from '../../../components/UI/Message/Message';
import Button from '../../../components/UI/Forms/Button/Button';
import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
  .email('Email invalide.')
  .required('Email requis.'),
});

const RecoverPassword = ({ error, loading, sendEmail, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await sendEmail(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
          Mot de passe oublié 
          </Heading>
          <Heading size="h4" bold color="white">
          Entrer votre email pour reinitialiser le mot de passe
          </Heading>
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Votre email ici..."
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Vérification...' : null}
              type="submit"
            >
Reinitialiser
            </Button>
            <MessageWrapper>
              <Message error show={error}>
              Quelque chose n'a pas marché . Verifiez l'email puis réessayer.
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
              Email de reiniatialisation a été envoyé !
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPassword);
