import { HelperType } from 'universal-helper';

export type TypeRepositoryPattern = {
  readUserProfile: () => Promise<HelperType.TypeAPIDataGolangResponse>;
  createUserProfile: (payload: {
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    tel: string | null;
    experience: string;
    organizationID: string;
    signInFrom: string | null;
    photoURL: string | null;
  }) => Promise<HelperType.TypeAPIDataGolangResponse>;
  updateUserAcceptAgreement: () => Promise<HelperType.TypeAPIDataGolangResponse>;
  createNewUserCollection: (payload: {
    sUsername: string;
  }) => Promise<HelperType.TypeAPIDataGolangResponse>;
  editFieldInCollection: (payload: {
    key: string;
    value: any;
  }) => Promise<HelperType.TypeAPIDataGolangResponse>;
};

// const fetchData = async () => {
//   setLoading(true);
//   const resData = await API.findAssessmentFromOrganizationID(
//     userData.profile.organizationID,
//   );
//   if (resData.error) {
//     console.log('error :', resData.error);
//     setLoading(false);
//     return;
//   }
//   setLoading(false);
//   // console.log('resData', resData.res);

//   setContent(resData.res.data);
// };
