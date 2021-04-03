import { ApolloError, useMutation } from "@apollo/client";
import { removeClientSetsFromDocument } from "@apollo/client/utilities";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from "../images//logo.svg";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import  { Helmet } from "react-helmet";
import { CreateAccountInput, UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";





const CREATE_ACCOUNT_MUTATION= gql `
    mutation createAccountMutation($createAccountInput: CreateAccountInput!){
        createAccount(input:$createAccountInput){
            ok
            error
        }
    }
    `;

interface ICreateAccountForm{
        email: string;
        password: string;
        role: UserRole;
    }

export const CreateAccount=()=>{
    const {register,getValues,handleSubmit,watch,errors,formState}=useForm<ICreateAccountForm>({mode:'onChange',
    defaultValues: {
        role: UserRole.Client,},
      });
    const history=useHistory();
    const onCompleted=(data:createAccountMutation)=>{
        const{
            createAccount:{ok},
        }=data;
        if(ok){
            //redirect to login page;
            alert("Account Created! ,You can Log in now!");
            history.push("/login");
        }
    }
    const[createAccountMutation,{loading,data:CreateAccountMutationResult},]=useMutation<createAccountMutation,createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION
        ,{onCompleted,});
    const onSubmit = () => {
        if (!loading) {
        const { email, password, role } = getValues();
        createAccountMutation({
            variables: {
            createAccountInput: { email, password, role },
            },
        });
        }
    };
    return <div className="h-screen flex items-center justify-center bg-cyan-900    ">
        <Helmet>
            <title>Create An Account</title>
        </Helmet>
        <div className="bg-teal-600  bg-opacity-90 w-full max-w-sm flex flex-col items-center  py-10 rounded-lg text-center">
        <img src ={logo} className=" w-40" />
        <h4 className="w-full font-medium text-left text-xl mt-2 px-2">Let's get Started </h4>
            <form onSubmit={handleSubmit(onSubmit)}
             className="grid gap-3 mt-6 px-6 w-full">
                <input ref={register({required:"email is required",
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
                required
                type="email"
                name="email"
                placeholder="Email"
                className=" input text-black ring border-red-800 focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>
                {
                    errors.email?.message && (<FormError errorMessage={errors.email?.message}/>)
                }
                {errors.email?.type === "pattern" && (
                    <FormError errorMessage={"Please enter a valid email"} />
                )}
                <input ref={register({required:"password is required"})}
                required
                type="password"
                name="password"
                placeholder="Password"
                className=" input text-black ring border-red-800  focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>
                {
                    errors.password?.message && (<FormError errorMessage={errors.password?.message}/>)
                }
                {
                    errors.password?.type==="minLength" && (<FormError errorMessage="Atleast 10 char are required" />)
                }
            <select
                name="role"
                ref={register({ required: true })}
                className="input"
            >
                {Object.keys(UserRole).map((role,index) => (
                <option key={index}>{role}</option>
                ))}
            </select>
                <Button canClick={formState.isValid} loading={loading} actionText={"Create an Account"}/>
            {CreateAccountMutationResult?.createAccount.error &&<FormError errorMessage={CreateAccountMutationResult?.createAccount.error}/>}
            </form>
            <div className="text-lg text-black py-3">
                Already have an account,<Link to="/login">Login now</Link>
            </div>
        </div>
    </div>
};
