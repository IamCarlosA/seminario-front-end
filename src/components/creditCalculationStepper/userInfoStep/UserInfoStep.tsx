/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import "./styles.scss";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Input, useStepper } from "@ecommerce-ozon/design_system";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Mail } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as UserCard } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import { useHistory } from "react-router-dom";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";
import { CreditFormResponseData, fetchCheckIn, UserDocument } from "../../../helpers/fetchCheckIn";
import { ValidateIdentityStepperFormValues } from "../../../views/validateIdentity/ValidateIdentity";
import { registerSalesforceLeads } from "../../../helpers/salesforce";
import { useCreditVerificationSelectedVehicle } from "../../../hooks/useCreditVerificationSelectedVehicle";

interface Props {
}
const getDocumentByType = ({ documents, type }: { documents?: UserDocument[], type: string }) => {
  if (!documents) {
    return undefined;
  }
  return documents.find(document => document.type === type);
};

const buildCreditForm = (creditFormData: CreditFormResponseData): CalculationStepperFormValues & any => {
  const {
    monthlyIncome,
    monthlySpending,
    childrenCount,
    dependantsCount,
    companyName,
    educationalLevel,
    economicActivity,
    position,
    civilStatus,
    livesWith,
    name,
    firstLastName,
    secondLastName,
    email,
    phone,
    documents,
    address,
    gender,
    day,
    month,
    year,
    assets,
    otherAsset,
    // eslint-disable-next-line camelcase
    personal_references,
    curp,
    _id
  } = creditFormData;
  return {
    incomeStep: {
      monthlyIncome,
      monthlySpending
    },
    dependantsStep: {
      childrenCount,
      dependantsCount,
      economicActivity,
      position,
      companyName,
      educationalLevel
    },
    userStatusStep: {
      civilStatus,
      livesWith,
      assets,
      otherAsset
    },
    userInfoStep: {
      name,
      firstLastName,
      secondLastName,
      email,
      phone,
      curp,
      address,
      gender,
      day,
      month,
      year,
    },

    identity: {
      ine_front: getDocumentByType({ documents, type: "ine_front" }),
      ine_back: getDocumentByType({ documents, type: "ine_back" }),
      selfie: getDocumentByType({ documents, type: "selfie" })
    },
    bank_certificates: {
      bank_certificate_1: getDocumentByType({ documents, type: "bank_certificate_1" }),
      bank_certificate_2: getDocumentByType({ documents, type: "bank_certificate_2" }),
      bank_certificate_3: getDocumentByType({ documents, type: "bank_certificate_3" })
    },
    proof_of_address: getDocumentByType({ documents, type: "proof_of_address" }),
    // eslint-disable-next-line camelcase
    personal_references,
    _id
  };
};

const UserInfoStep: FC<Props> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_final", {
      category: "Financial Form",
      label: "click continue in the final step of the form"
    });
  }, []);

  const { handleChange, values, errors, handleBlur, touched } =
    useFormikContext<CalculationStepperFormValues>();
  const isValid = useValidateStep("userInfoStep");
  const { incrementCurrentStep } = useStepper();
  const selectedVehicle = useCreditVerificationSelectedVehicle();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const tryLogin = async () => {
    try {
      setLoading(true);
      const data = await fetchCheckIn({
        email: values.userInfoStep.email,
        name: `${values.userInfoStep.name} ${values.userInfoStep.firstLastName} ${values.userInfoStep.secondLastName}`,
        phone: `${values.userInfoStep.phone}`
      });
      // registerSalesforceLeads({
      //   email: values.userInfoStep.email,
      //   name: `${values.userInfoStep.name} ${values.userInfoStep.lastName}`,
      //   phone: `${values.userInfoStep.phone}`,
      //   description: selectedVehicle?.internalId
      // });
      const creditForms = data?.user?.financialForm;
      setLoading(false);
      if (creditForms.length > 0) {
        history.push("/financia-tu-moto/results", buildCreditForm({
          ...creditForms[0],
          email: values.userInfoStep.email,
          name: `${values.userInfoStep.name} ${values.userInfoStep.firstLastName} ${values.userInfoStep.secondLastName}`,
          phone: `${values.userInfoStep.phone}`
        }));
      } else {
        incrementCurrentStep();
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="userInfoStep-container">
      <div>
        <Input
          onBlur={handleBlur}
          error={
            !!_.get(errors, "userInfoStep.name") && !!_.get(touched, "userInfoStep.name")
          }
          subtitle={
            !!_.get(touched, "userInfoStep.name") && _.get(errors, "userInfoStep.name")
          }
          name="userInfoStep.name"
          value={_.get(values, "userInfoStep.name")}
          onChange={handleChange}
          type="text"
          title="Nombre"
          icon={<Boy className="primary_300" />}
        />
      </div>
      <div>
        <Input
          onBlur={handleBlur}
          error={
            !!_.get(errors, "userInfoStep.lastName") &&
            !!_.get(touched, "userInfoStep.lastName")
          }
          subtitle={
            !!_.get(touched, "userInfoStep.lastName") &&
            _.get(errors, "userInfoStep.lastName")
          }
          name="userInfoStep.lastName"
          value={_.get(values, "userInfoStep.lastName")}
          onChange={handleChange}
          type="text"
          title="Apellido"
          icon={<Boy className="primary_300" />}
        />
      </div>
      <div>
        <Input
          onBlur={handleBlur}
          error={
            !!_.get(errors, "userInfoStep.email") && !!_.get(touched, "userInfoStep.email")
          }
          subtitle={
            !!_.get(touched, "userInfoStep.email") && _.get(errors, "userInfoStep.email")
          }
          name="userInfoStep.email"
          value={_.get(values, "userInfoStep.email")}
          onChange={handleChange}
          type="text"
          title="Correo"
          icon={<Mail className="primary_300" />}
        />
      </div>
      <div>
        <Input
          onBlur={handleBlur}
          error={
            !!_.get(errors, "userInfoStep.phone") && !!_.get(touched, "userInfoStep.phone")
          }
          subtitle={
            !!_.get(touched, "userInfoStep.phone") && _.get(errors, "userInfoStep.phone")
          }
          name="userInfoStep.phone"
          value={_.get(values, "userInfoStep.phone")}
          onChange={handleChange}
          type="text"
          title="Celular"
          icon={<Phone className="primary_300" />}
        />
      </div>
      <div>
        <Input
          onBlur={handleBlur}
          error={!!_.get(errors, "userInfoStep.curp") && !!_.get(touched, "userInfoStep.curp")}
          subtitle={!!_.get(touched, "userInfoStep.curp") && _.get(errors, "userInfoStep.curp")}
          name="userInfoStep.curp"
          value={_.get(values, "userInfoStep.curp")}
          onChange={handleChange}
          type="text"
          title="CURP"
          icon={<UserCard className="primary_300" />}
        />
      </div>
      <NextStepButton disabled={loading} onClick={tryLogin} isValid={isValid} />
    </div>
  );
};

export default UserInfoStep;
