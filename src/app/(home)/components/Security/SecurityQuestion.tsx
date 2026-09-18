import { Base } from "@/components/Base/Base";
import { pxToRem } from "@/utils/pxToRem";

interface SecurityQuestionProps extends React.PropsWithChildren {
  title: string;
}

export function SecurityQuestion(props: SecurityQuestionProps) {
  const { title, children } = props;

  return (
    <Base
      as="section"
      display="flex"
      flexDirection="column"
      gap={pxToRem(8)}
    >
      <Base as="h3" fontSize={pxToRem(18)} fontWeight={700}>
        {title}
      </Base>

      <Base as="p" fontSize={pxToRem(12)}>
        {children}
      </Base>
    </Base>
  );
}
