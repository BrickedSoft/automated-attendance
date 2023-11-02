"use client";

import React from "react";
import path from "path";
// import { promises as fs } from "fs";

const File = () => {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const file = e.target.file.files[0];

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    // try {
    //   await fs.writeFile(
    //     path.join(process.cwd(), "public/uploads/" + filename),
    //     buffer
    //   );
    //   // return NextResponse.json({ Message: "Success", status: 201 });
    // } catch (error) {
    //   console.log("Error occured ", error);
    //   // return NextResponse.json({ Message: "Failed", status: 500 });
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="file" name="file" />
      </label>
      <button type="submit" value={"submit"}>
        Submit
      </button>
    </form>
  );
};

export default File;
