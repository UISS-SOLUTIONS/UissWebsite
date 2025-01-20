"use client";
export default function CustomForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim();
    const options = Array.from((form.elements.namedItem("options") as HTMLSelectElement).selectedOptions).map(
      (option) => (option as HTMLOptionElement).value
    );
    const file = (form.elements.namedItem("file") as HTMLInputElement).files![0];
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    const errors = [];

    // Validation
    if (!firstName) errors.push("First Name is required.");
    if (!lastName) errors.push("Last Name is required.");
    if (options.length === 0) errors.push("Select at least one option.");
    if (!file) {
      errors.push("File is required.");
    } else if (!["image/jpeg", "image/jpg"].includes(file.type)) {
      errors.push("Only jpg/jpeg files are allowed.");
    }
    if (password.length < 6)
      errors.push("Password must be at least 6 characters long.");
    if (password !== confirmPassword) errors.push("Passwords must match.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Submit data
    console.log({
      firstName,
      lastName,
      options,
      fileName: file.name,
      password,
    });
    alert("Form submitted successfully!");
  };

  return (
    <>
    <div className="flex flex-col pb-4">

      <span className="text-4xl font-bold">Sign Up</span>
      <span className="pt-3 opacity-70">Join UISS and enroll in your desired program to kickstart your journey today!</span>
    </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="firstName" className="font-bold">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="border-[1px] border-black/20 rounded-md py-1 px-3 focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="lastName" className="font-bold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="border-[1px] border-black/20 rounded-md py-1 px-3 focus:outline-none"
          />
        </div>

        {/* Options (Multi-Select) */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="options" className="font-bold">
            Select Options
          </label>
          <select
            id="options"
            name="options"
            className="border-[1px] border-black/20 rounded-md py-1 px-3 focus:outline-none"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="file" className="font-bold">
            Upload File (jpg, jpeg)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg,.jpeg"
            className="input-field focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-[1px] border-black/20 rounded-md py-1 px-3 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border-[1px] border-black/20 rounded-md py-1 px-3 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary bg-ternary  text-lg font-bold py-1 px-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
