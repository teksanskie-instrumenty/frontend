import { Spinner } from "@nextui-org/react";

function ContentLoader() {
  return (
    <div className="flex flex-row justify-center mt-8">
      <Spinner size='lg' color='white' />
    </div>
  );
}

export default ContentLoader;
