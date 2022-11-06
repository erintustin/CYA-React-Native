# Congrats, You're Autistic! Build Your Own Neurodiversity-Affirming Toolkit

A mobile app companion to the 'Congrats, You're Autistic' web app that allows users to create a personalized toolkit using preloaded resources as well as adding their own favorites from the web. The repository for the web app can be found here:https://github.com/erintustin/CYA A live demo of the web app is here: https://congratsyoureautistic.web.app/

## Concept
The original Congrats, You're Autistic project was conceived with the goal of offering an alternative to the PDF toolkit currently offered by most medical providers following an autism diagnosis. 
With an understanding that Autistic adults are the foremost experts on what it means to have Autism, this project seeks to compile the best autistic-authored resources on the web and offer them 
in an easy-to-share format. The mobile app will allow users to keep the resources most relveant to them 'in their pocket' and allow them to add additional
resources from the web for a personalized experience. 

This project promotes viewing Autism through the lens of Neurodiversity and the social model of disability, which sees disability as a natural part of human diversity to be celebrated, supported, 
and accomodated. This app seeks to streamline the process of spreading awareness in order to build up a supportive network of people to help users live their most fulfilling autistic lives. 

Video Demo: https://loom.com/share/45e38eac0346450889aa984485132465

## Technologies and Features
This project was developed with JavaScript/JSX using React Native and relies heavily on react-native-swipe-list-view to display the directory of resources as
well as each toolkit. Each resource in the toolkit is contained on an InfoScreen that houses the available features. These features are:

View Resource - opens the resource at its original source in the device's browser
Add to Toolkit/Remove from Toolkit - adds or removes the resource to/from a toolkit
Add Note - allows users to add a note
Share - allows users to share resource via device's native share options
Share with Note - allows users to share resource with the text of a note added in addition to the link

In addition, users are able to Add a Resource to the resource directory which will function the same as the preloaded resources from its own InfoScreen. 

Both Stack Navigation and Drawer Navigation are utilized. SwipeRow with Touchable Opacities is used in the Resource Directory allow users to quickly share or add a resource to their toolkit.
SwipeRow is also used with a Touchable Opacity on the Toolkit Screen to quickly delete resources. 

## Back-End/Server-Side
Currently the project is utilizing a REST API hosted on a local JSON Server. I'm currently working on integrating with the same Express Server utilizing NodeJS and MongoDB that will serve the 'Congrats, You're Autistic' web app. 
The server respository can be found here: https://github.com/erintustin/CYAServer

## Future Goals
I would like users to be able to create multiple personalized toolkits for different audiences and settings. 

I would like to expand this project to include other aspects of the Neurodivergent Spectrum ie ADHD, OCD, PTSD,  Tourette's, etc. with the overall goal of demystifying diagnosis and making it a more positive experience of understanding oneself and receiving the support one needs. 

## How to Contribute
I'm looking for assistance, especially from the Neurodivergent community, in selecting resources, testing accessiblity and design/user experience, as well as help developing the back-end to make this a fully-functioning web app. I have several medical providers interested in referring patients to this toolkit once completed. Please contact me at erintustin@gmail.com if you are interested in becoming a part of this project. 







