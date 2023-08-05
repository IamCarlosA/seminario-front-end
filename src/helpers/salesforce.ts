type LeadData = {
  name: string;
  phone: string;
  email: string;
  description?: string;
}
export const registerSalesforceLeads = (data: LeadData) => {
  const fields: any = {...data};
  const customHiddenIframeName="JLA_API";
  if(!document.getElementById(customHiddenIframeName)){
    const theiFrame=document.createElement("iframe");
    theiFrame.id=customHiddenIframeName;
    theiFrame.name=customHiddenIframeName;
    theiFrame.src="about:blank";
    theiFrame.style.display="none";
    document.body.appendChild(theiFrame);
  }
  fields.orgid = "00D4x000007uurw";
  fields.retURL="https://ozon.mobi/";// dummy URL
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8";
  form.setAttribute("target", customHiddenIframeName);
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const fieldName in fields) {
    const theInput = document.createElement("input");
    theInput.name=fieldName;
    theInput.value=fields[fieldName];
    theInput.setAttribute("type", "hidden");
    form.appendChild(theInput);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

