import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required(),
  markdown: yup.string().required(),
  testCases: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          input: yup.string().required(),
          output: yup.string().required(),
        })
    )
    .required(),
})
