import React from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const City = () => {
  const [queryParameters] = useSearchParams();
  const { data, loading } = useFetch(
    `venue?city=${queryParameters.get("name")}`
  );
  //   console.log(data);
  return (
    <>
      <div className="common-padding city-venues">
        <h3 className="common-header text-capitalize">
          Venues in <span>{queryParameters.get("name")}</span>
        </h3>
        <div className="row g-5">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.data && data.data.length > 0 ? (
                data.data.map((item) => (
                  <div className="col-lg-6">
                    <div className="py-5">
                      <SearchItem item={item} key={item._id} />
                    </div>
                  </div>
                ))
              ) : (
                <h3>No Venue found</h3>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default City;
