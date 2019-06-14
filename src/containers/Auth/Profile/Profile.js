import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Message from '../../../components/UI/Message/Message';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

import * as actions from '../../../store/actions';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 3rem;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const ProfileSchema = Yup.object().shape({
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

const Profile = ({
  firebase,
  editProfile,
  loading,
  error,
  loadingDelete,
  errorDelete,
  deleteUser,
  cleanUp,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // edit the profile here
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Heading noMargin size="h1" color="white">
            Modifier votre profil
            </Heading>
            <Heading bold size="h4" color="white">
              Mettez vos informations à jour
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
                placeholder="Confirmer votre mot de passe..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? 'Modification...' : null}
                type="submit"
              >
                Modifier
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Votre profil a été mis à jour
                </Message>
              </MessageWrapper>
              <DeleteWrapper onClick={() => setModalOpened(true)}>
                Supprimer mon compte
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <Heading noMargin size="h1" color="white">
          Supprimer votre compte
        </Heading>
        <Heading bold size="h4" color="white">
          Êtes-vous sûr de vouloir supprimer votre compte?
        </Heading>
        <ButtonsWrapper>
          <Button
            contain
            onClick={() => deleteUser()}
            color="red"
            disabled={loadingDelete}
            loading={loadingDelete ? 'Suppression...' : null}
          >
            Supprimer
          </Button>
          <Button color="main" contain onClick={() => setModalOpened(false)}>
            Annuler
          </Button>
        </ButtonsWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
