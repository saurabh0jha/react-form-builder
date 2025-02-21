import { FC, useEffect, useState } from "react";
import "./FormListing.css";

import { TManagedForm } from "../../types/globals";
import { deleteManagedForm, fetchManagedForms } from "../../api/endpoints";
import { useNavigate } from "react-router";
import { Loader } from "../Loader/Loader";
import { successToast, warningToast } from "../../utilities/toastMessages";

interface IFormListingProps {}

export const FormListing: FC<IFormListingProps> = () => {
  const navigate = useNavigate();
  const [managedForms, setManagedForms] = useState<TManagedForm[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      const data = await fetchManagedForms();
      if (data.statusCode === 200) {
        const transformedForms = data.data.map((row) => {
          const utcSeconds = parseInt(row.createdAt, 10) / 1000;
          var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
          d.setUTCSeconds(utcSeconds);
          return {
            ...row,
            createdAt: `${d.toDateString()} ${d.toLocaleTimeString()}`,
          };
        });
        setManagedForms(transformedForms);
      } else {
        setError(data.statusMesage);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchForms();
  }, []);

  return (
    <div className="form-listing-container">
      <h1>Your forms</h1>
      <div className="top-level-actions">
        {managedForms?.length ? (
          <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={() => {}}
            value=""
          />
        ) : (
          <div></div>
        )}
        <button
          className="primary long"
          onClick={() => {
            navigate("/generate");
          }}
        >
          Create a form
        </button>
      </div>
      <table className="form-listing">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Description</th>
            <th>Stats</th>
            <th>Actions</th>
          </tr>
        </thead>
        {managedForms?.length > 0 ? (
          <tbody>
            {managedForms.map((managedForm: TManagedForm) => (
              <tr>
                <td>{managedForm.name}</td>
                <td>{managedForm.createdAt}</td>
                <td>{managedForm.description}</td>
                <td>{`Fields: ${managedForm.stats.fieldCount} Usages: ${managedForm.stats.usageCount}`}</td>
                <td>
                  <div className="actions">
                    <button
                      className="primary compact"
                      onClick={() => {
                        navigate(`/preview/${managedForm.id}`);
                      }}
                    >
                      Preview
                    </button>
                    <button
                      className="primary compact"
                      onClick={() => {
                        warningToast("Not Implemented");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="secondary compact"
                      onClick={async () => {
                        const newArrayResp = await deleteManagedForm(
                          managedForm.id
                        );
                        if (newArrayResp.statusCode === 200) {
                          successToast("Successfully deleted the managed form");
                        }
                        setManagedForms(newArrayResp.data);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="no-data" colSpan={5}>
                {isLoading ? (
                  <Loader />
                ) : (
                  error ||
                  "There are no managed forms currently. Please add a new form."
                )}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
