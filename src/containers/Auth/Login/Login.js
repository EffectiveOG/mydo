import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';
import CustomLink from '../../../components/UI/CustomLink/CustomLink';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
  .email('Email invalide.')
  .required('Email requis.'),
password: Yup.string()
  .required('Mot de passe requis.')
  .min(8, 'Trop court.'),
});

const Login = ({ login, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
          Connectez-vous à Mydo
          </Heading>
          <Heading bold size="h4" color="white">
          Remplissez les champs pour acceder à votre compte
          </Heading>
          <StyledForm>
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
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Connexion en cours...' : null}
              type="submit"
            >
              Connexion
            </Button>
            <CustomLink link="/recover" color="white">
            Mot de passe oublié ? 
            </CustomLink>
            <MessageWrapper>
              <Message error show={error}>
              Oops! Je n'arrive pas à vous connecter. Vérifier la connexion internet puis réessayer
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
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
