import { UserDocument } from "./fetchCheckIn";
import { PandaboardApiInstance } from "./api";
import {ISlackNotifier, slackNotifyTruoraFailed} from "./slackNotifier/slackNotifier";

export interface IDocument {
  imageData: any;
  imageFile: Blob | UserDocument;
}
type DocumentType = IDocument | null | undefined;
export type TruoraValidationResult = {
  history: {
    validation_status: "success" | "failure";
  }[];
};

function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const validateIdentity = async (documents: {
  ine_front: DocumentType;
  ine_back: DocumentType;
  selfie: DocumentType;
}, slackNotifierArgs:ISlackNotifier) => {
  const idFormData = new FormData();
  idFormData.append("document_front", documents.ine_front?.imageFile as Blob);
  idFormData.append("document_reverse", documents.ine_back?.imageFile as Blob);
  const truoraResult = await PandaboardApiInstance.post<string>(
    "truora",
    idFormData,
    { requireAuth: true }
  );
  const accountId = truoraResult.data;

  // we need to wait before call the validation endpoint to be sure that the validation was done correctly
  await sleep(10000);

  const selfieFormData = new FormData();
  selfieFormData.append("fileImg", documents.selfie?.imageFile as Blob);
  await PandaboardApiInstance.post(
    `truora/validation-face/${accountId}`,
    selfieFormData,
    { requireAuth: true }
  );

  // we need to wait before call the validation endpoint to be sure that the validation was done correctly
  await sleep(10000);

  const result = await PandaboardApiInstance.post<TruoraValidationResult>(
    `truora/validations/${accountId}`,{},
    { requireAuth: true }
  );

  const invalids = result.data.history.filter(
    (item) => item.validation_status === "failure"
  );

  if (invalids.length > 0) {

    await slackNotifyTruoraFailed(slackNotifierArgs);
    throw invalids;
  }
};
