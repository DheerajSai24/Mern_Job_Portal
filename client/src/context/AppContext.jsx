import { createContext, useMemo, useState } from "react";
import { jobsData, jobsApplied as initialJobsApplied } from "../assets/assets";

export const AppContext = createContext();

export const AppcontextProvider = ({ children }) => {
  // All jobs from assets
  const [jobs] = useState(jobsData);

  // Search / filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Applications state (start with sample, allow additions)
  const [appliedJobs, setAppliedJobs] = useState(initialJobsApplied);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyId?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category);

      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.includes(job.location);

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [jobs, searchTerm, selectedCategories, selectedLocations]);

  const getJobById = (id) => jobs.find((job) => job._id === id);

  const applyToJob = (jobId) => {
    const job = getJobById(jobId);
    if (!job) return;

    // Avoid duplicate entries for same job + status Pending
    const alreadyApplied = appliedJobs.some(
      (item) => item.title === job.title && item.location === job.location
    );

    if (alreadyApplied) return;

    const newApplication = {
      company: job.companyId?.name || "Company",
      title: job.title,
      location: job.location,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
      logo: job.companyId?.image,
    };

    setAppliedJobs((prev) => [newApplication, ...prev]);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const value = {
    jobs,
    filteredJobs,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
    toggleCategory,
    toggleLocation,
    getJobById,
    appliedJobs,
    applyToJob,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};