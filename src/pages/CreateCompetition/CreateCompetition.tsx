import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Form, message, Tabs, Typography } from "antd";
import type { TabsProps, FormProps } from "antd";
import GeneralInfo, { type GeneralInfoFieldType } from "./GeneralInfo.tsx";
import Description, { type DescriptionFieldType } from "./Description.tsx";
import Environment, { type EnvironmentFieldType } from "./Environment.tsx";
import Publication, { type PublicationFieldType } from "./Publication.tsx";
import api from "../../api/service.api.ts";
import { CreateCompetitionRequest } from "../../types/api.ts";
import "./CreateCompetition.css";
import { LoadingOutlined } from "@ant-design/icons";
import useStore from "../../hooks/useStore.hook.tsx";
import { observer } from "mobx-react-lite";


type FieldType =
  GeneralInfoFieldType &
  DescriptionFieldType &
  EnvironmentFieldType &
  PublicationFieldType;


const initialValues: Partial<FieldType> = {
  // GeneralInfoFieldType
  name: "Решение проблемы булочки с шоколадом\\изюмом",
  subtitle: "Распознать по фото с какой начинкой булочка",
  url: "bake-url",
  competitionType: "ML",
  startDate: dayjs(),
  endDate: dayjs().add(7, "days"),

  // DescriptionFieldType
  shortDescription: "Создать ML модель которая по фото распознает с какой начинкой булочка",
  detailedDescription: "Создать ML модель которая по фото распознает с какой начинкой булочка\n" +
    "начальный датасет - 100 фото",
  goals: "Помочь пользователю не ошибиться в выборе выпечки",
  rules: "Нет",
  prizeAmount: 20000,
  prizeInfo: "Денежный приз + годовой запас выпечки",
  tags: ["AI", "ML"],

  // EnvironmentFieldType
  rlRepository: "https://github.com/DenkingOfficial/cartpole-evaluation",
  rlSolutionExtension: ".bin",
  mlMetric: "accuracy",
  mlTargetVariable: "target_variable",

  // PublicationFieldType
  visibility: "public",
  participation: "everyone"
};


const CreateCompetition = observer(() => {
  const [currentTab, setCurrentTab] = useState("generalInfo");
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();
  const { userStore } = useStore();

  const items: TabsProps["items"] = [
    {
      label: <span className="tab-label">Общая информация</span>,
      key: "generalInfo",
      children: <GeneralInfo />,
      forceRender: true
    },
    {
      label: <span className="tab-label">Описание</span>,
      key: "description",
      children: <Description />,
      forceRender: true
    },
    {
      label: <span className="tab-label">Окружение</span>,
      key: "environment",
      children: <Environment />,
      forceRender: true
    },
    {
      label: <span className="tab-label">Публикация</span>,
      key: "publication",
      children: <Publication />,
      forceRender: true
    }
  ];

  const onFormFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const competitionRequest: CreateCompetitionRequest = {
        name: values.name,
        subtitle: values.subtitle,
        url: values.url,
        competitionType: values.competitionType,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        backgroundImage: values.backgroundImage?.file ?? null,

        shortDescription: values.shortDescription,
        detailedDescription: values.detailedDescription,
        goals: values.goals,
        rules: values.rules,
        prizeAmount: values.prizeAmount,
        prizeInfo: values.prizeInfo || undefined,
        documentation: values.documentation ? values.documentation.fileList.map((val) => val.originFileObj) : null,

        tags: values.tags,

        visibility: values.visibility,
        participation: values.participation,

        ...(values.competitionType === "RL" && {
          rlRepository: values.rlRepository,
          rlSolutionExtension: values.rlSolutionExtension,
          rlPublicFiles: values.rlPublicFiles.fileList ? values.rlPublicFiles.fileList.map((val) => val.originFileObj) : null
        }),

        ...(values.competitionType === "ML" && {
          mlMetric: values.mlMetric,
          mlTargetVariable: values.mlTargetVariable,
          mlPublicDataset: values.mlPublicDataset.file ?? null,
          mlPrivateDataset: values.mlPrivateDataset.file ?? null
        })
      };

      const response = await api.createCompetition(competitionRequest);

      if (response.status === 401) {
        message.error("Ошибка авторизации");
      } else if (response.status !== 201) {
        message.error("Ошибка создания соревнования");
      } else {
        message.success("Успешное создание соревнования!");
        navigate(`/competitions/${response.data.url}`);
      }
    } catch (error) {
      console.log(error);
      message.error("Ошибка создания соревнования");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = async ({ values, errorFields }) => {
    console.log(values);

    if (errorFields.length > 0) {
      const firstError = errorFields[0];
      const fieldError = firstError.errors[0];
      //
      // const tab = getTabFromFieldName(fieldName);
      //
      // if (tab) {
      //   setCurrentTab(tab); // Switch to the appropriate tab
      // }

      // form.scrollToField(fieldName, {
      //   behavior: "smooth",
      //   block: "center",
      // });
      message.error(fieldError);
    }
  };

  if (!userStore.isFetched) {
    return <LoadingOutlined className="text-[40px]" />;
  }

  useEffect(() => {
    if (userStore.isFetched && !userStore.isLoggedIn) {
      navigate(`/login`);
    }
  }, [navigate, userStore.isFetched, userStore.isLoggedIn]);

  // if (!userStore.isLoggedIn || !userStore.userData) {
  //   return <>{navigate('/login')}</>;
  // }

  return (

    <div className="create-competition-page w-full h-full flex justify-center items-center bg-background-primary">
      <div className="flex justify-center flex-col max-w-[78.5%] self-start w-full">
        <div className="flex flex-row mt-[16px] justify-between">
          <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter">
            Создать соревнование
          </Typography.Text>
          <Button type="primary" htmlType="button" className="w-[95px] rounded-[2px]" onClick={() => form.submit()}>
            Сохранить
          </Button>
        </div>
        <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">
          Проведите собственное соревнование на платформе RL Arena.
        </Typography.Text>
        <Form form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFormFinish}
              onFinishFailed={onFinishFailed}
              initialValues={initialValues}
          // initialValues={{
          //   competitionType: "RL",
          //   prizeAmount: 0,
          //   tags: [],
          //   visibility: "public",
          //   participation: "everyone",
          // }}
        >
          <Tabs items={items}
                tabBarGutter={50}
                onChange={(activeKey) => setCurrentTab(activeKey)}
                defaultActiveKey={currentTab}
                activeKey={currentTab} />
        </Form>
      </div>
    </div>
  );
});

export default CreateCompetition;