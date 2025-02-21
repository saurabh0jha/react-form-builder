import { TManagedForm } from "../types/globals";

type httpResponse<T> = {
    statusCode: number;
    statusMesage: string;
    data: T  
}

export const fetchManagedForms = (): Promise<httpResponse<TManagedForm[]>> => {
    return new Promise((resolve, reject) => {
        const delay = 1500;
        setTimeout(() => {
        try{
            let managedForms = localStorage.getItem("managedForms");
            if(managedForms){
              managedForms = JSON.parse(managedForms);
              if(Array.isArray(managedForms)){
                resolve({statusCode: 200, statusMesage: "Success", data: managedForms as TManagedForm[]});
              }
            } else {
                resolve({statusCode: 200, statusMesage: "Success", data: []});
            }
        } catch(e){
            reject({statusCode: 500, statusMessage: "Failed to fetch data. Try Again."})
        }
          
        }, delay);
      });
}

export const fetchManagedForm = (id: string): Promise<httpResponse<TManagedForm | null>> => {
    return new Promise((resolve, reject) => {
        const delay = 1500;
        setTimeout(() => {
        try{
            let managedForms = localStorage.getItem("managedForms");
            if(managedForms){
              managedForms = JSON.parse(managedForms);
              if(Array.isArray(managedForms)){
                const managedForm = managedForms.find((form)=> form.id === id)
                resolve({statusCode: 200, statusMesage: "Success", data: managedForm as TManagedForm});
              }
            } else {
                resolve({statusCode: 200, statusMesage: "Success", data: null});
            }
        } catch(e){
            reject({statusCode: 500, statusMessage: "Failed to fetch data. Try Again."})
        }
          
        }, delay);
      });
}

export const saveManagedForm = (managedForm: TManagedForm): Promise<httpResponse<TManagedForm>> => {

    return new Promise((resolve, reject) => {
        const delay = 1500;
        setTimeout(() => {
            try{
                let managedForms = localStorage.getItem("managedForms");
                if(managedForms){
                    managedForms = JSON.parse(managedForms);
                    if(Array.isArray(managedForms)){
                        managedForms.push(managedForm);
                    }
                    localStorage.setItem("managedForms", JSON.stringify(managedForms));
                } else {
                    localStorage.setItem("managedForms", JSON.stringify([managedForm]));
                }
                resolve({statusCode: 200, statusMesage: "Success", data: managedForm});
            } catch(e){
                reject({statusCode: 500, statusMessage: "Failed to save the form. Try Again."})
            }
             
        }, delay);
      });


    

}

export const deleteManagedForm = (id: string): Promise<httpResponse<TManagedForm[]>> => {

    return new Promise((resolve, reject) => {
        const delay = 1500;
        setTimeout(() => {
            try{
                const managedForms = localStorage.getItem("managedForms");
                if(managedForms){
                    const parsedForms = JSON.parse(managedForms);
                    if(Array.isArray(parsedForms)){
                        const idxToDelete = parsedForms.findIndex(form => form.id === id)
                        parsedForms.splice(idxToDelete, 1);
                    }
                    localStorage.setItem("managedForms", JSON.stringify(parsedForms));
                    resolve({statusCode: 200, statusMesage: "Success", data: parsedForms});
                } else {
                    resolve({statusCode: 200, statusMesage: "Success", data: []});
                }
            } catch(e){
                reject({statusCode: 500, statusMessage: "Failed to save the form. Try Again."})
            }
             
        }, delay);
      });


    

}