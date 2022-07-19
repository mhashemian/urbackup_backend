FROM ubuntu

RUN apt clean
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y gcc g++ make git autoconf libssl-dev zlib1g-dev libtool pkg-config

#RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common
#RUN echo 'deb http://download.opensuse.org/repositories/home:/uroni/xUbuntu_22.04/ /' | tee /etc/apt/sources.list.d/home:uroni.list
#RUN curl -fsSL https://download.opensuse.org/repositories/home:uroni/xUbuntu_22.04/Release.key | gpg --dearmor | tee /etc/apt/trusted.gpg.d/home_uroni.gpg > /dev/null
#RUN apt update
#RUN apt install urbackup-server

#RUN add-apt-repository ppa:uroni/urbackup
#RUN apt update
#RUN apt install urbackup-server

RUN git clone https://github.com/uroni/urbackup_backend
WORKDIR urbackup_backend
RUN ./switch_build.sh server
RUN autoupdate
RUN autoreconf --install
#RUN ./configure
#RUN make -j8
