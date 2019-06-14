import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('Votre prénom est requis')
  .min(3, 'Trop court.')
  .max(25, 'Trop long.'),
lastName: Yup.string()
  .required('Votre nom est obligatoire')
  .min(3, 'Trop court.')
  .max(25, 'Trop long.'),
email: Yup.string()
  .email('Email invalide.')
  .required('Email requis.'),
password: Yup.string().required('Taper un mot de passe.').min(8, 'Trop court, 8 caractères au minimum'),
confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], `Mot de passe incorrect`)
  .required('Veuillez verifier votre mot de passe.'),
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await signUp(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
          Créer un compte
          </Heading>
          <Heading bold size="h4" color="white">
          Remplissez les champs pour créer votre compte
          </Heading>
          <StyledForm>
            <Field
              type="text"
              name="firstName"
              placeholder="Votre prénom..."
              component={Input}
            />
            <Field
              type="text"
              name="lastName"
              placeholder="Votre nom..."
              component={Input}
            />
            <Field
              type="email"
              name="email"
              placeholder="Votre email..."
              component={Input}
            />
            <Field
              type="password"
              name="password"
              placeholder="Votre mot de passe..."
              component={Input}
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Re-tapez le mot de passe..."
              component={Input}
            />
            <Button disabled={!isValid || isSubmitting} loading={loading ? 'Création de compte...' : null} type="submit">
              S'enregistrer
            </Button>
            <MessageWrapper>
              <Message error show={error}>
              Oops! Cette adresse email exist déjà.
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
