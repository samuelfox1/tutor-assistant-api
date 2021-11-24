import React, { useState, useContext } from 'react'
import { Form, Button, Columns, Icon } from 'react-bulma-components'
import { AppContext } from '../../Context/AppProvider'
import { signup } from '../../utils'

const { Field, Label, Control, Input, Select } = Form
const { Column } = Columns

export const SignupForm = () => {

    const [formInputs, setFormInputs] = useState({
        firstName: 'Sam',
        lastName: 'Fox',
        email: 'sam@email.com',
        timeZone: '',
        gitHubUsername: 'samuelfox1',
        calendlyLink: 'https://www.calendly.com',
        courses: '',
        password: 'password',
        confirmPassword: 'password'
    })

    const { firstName, lastName, email, timeZone, gitHubUsername, calendlyLink, courses, password, confirmPassword } = formInputs
    const { setTutorDetails, updateAppComponent } = useContext(AppContext)

    const handleInputChange = (e) => {
        const { target: { name, value } } = e
        setFormInputs({ ...formInputs, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const tutor = await signup(formInputs)
            if (!tutor) return
            setTutorDetails({ ...tutor, loggedIn: true })
            updateAppComponent(null)
        } catch (error) {
            // login failed
            console.error('login failed')
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateSelect = (val) => (val && val !== '---')
    const validatePassword = (pw) => pw.length >= 8


    return (
        <form>

            <Columns
                centered
                vCentered
            >
                <Column>
                    <Label>First Name</Label>
                    <Control>
                        <Input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="far fa-address-card"></i>
                        </Icon>
                        {firstName &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>

                <Column>
                    <Label>Last Name</Label>
                    <Control>
                        <Input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="fas fa-address-card"></i>
                        </Icon>
                        {lastName &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>
                <Column>
                    <Label>Github Username</Label>
                    <Control>
                        <Input
                            type='text'
                            name='gitHubUsername'
                            value={gitHubUsername}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="fab fa-github"></i>
                        </Icon>
                        {gitHubUsername &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>
            </Columns>


            <Columns>
                <Column narrow>
                    <Label>Time Zone</Label>
                    <Field kind='addons'>
                        <Control>
                            <Select
                                type='text'
                                name='timeZone'
                                value={timeZone}
                                onInput={handleInputChange}
                            >
                                <option>---</option>
                                <option>Pacific</option>
                                <option>Mountain</option>
                                <option>Central</option>
                                <option>Eastern</option>
                            </Select>
                        </Control>
                        <Control>
                            {validateSelect(timeZone) &&
                                <Icon className='ml-2 mt-2'>
                                    <i className="fas fa-check" />
                                </Icon>
                            }
                        </Control>
                    </Field>
                </Column>
                <Column>
                    <Label>Email</Label>
                    <Control>
                        <Input
                            type='text'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <Icon align='left'>
                            <i className="far fa-envelope"></i>
                        </Icon>
                        {validateEmail(email) &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>
            </Columns>

            <Columns>
                <Column narrow>
                    <Label>Course(s)</Label>
                    <Field kind='addons'>
                        <Control>
                            <Select
                                name='courses'
                                value={courses}
                                onInput={handleInputChange}
                            >
                                <option>---</option>
                                <option>Full Stack Web Development</option>
                                <option>Fin Tech</option>
                            </Select>
                        </Control>
                        <Control>
                            {validateSelect(courses) &&
                                <Icon className='ml-2 mt-2'>
                                    <i className="fas fa-check" />
                                </Icon>
                            }
                        </Control>
                    </Field>
                </Column>

                <Column>
                    <Label>Calendly Link</Label>
                    <Control>
                        <Input
                            type='text'
                            name='calendlyLink'
                            value={calendlyLink}
                            onChange={handleInputChange}
                        />
                        <Icon align="left">
                            <i className="fas fa-link"></i>
                        </Icon>
                        {calendlyLink &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>
            </Columns>

            <Columns>
                <Column>
                    <Label>Password</Label>
                    <Control>
                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                        <Icon align="left">
                            <i className="fas fa-lock"></i>
                        </Icon>
                        {validatePassword(password) &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>

                <Column>
                    <Label>Confirm Password</Label>
                    <Control>
                        <Input
                            type='password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                        <Icon align="left">
                            <i className="fas fa-lock"></i>
                        </Icon>
                        {password === confirmPassword &&
                            <Icon align="right">
                                <i className="fas fa-check" />
                            </Icon>
                        }
                    </Control>
                </Column>
            </Columns>

            <Button
                fullwidth
                rounded
                color="primary"
                className='mt-5'
                onClick={handleSignup}
            >
                Signup
            </Button>
        </form >
    )
}
