from setuptools import find_namespace_packages, setup

with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name="v4-proto",
    version="0.0.0",
    author="Klyra Trading Inc.",
    author_email="contact@klyra.exchange",
    description="Protos for Klyra Chain protocol",
    packages = find_namespace_packages(),
    include_package_data=True,  # Include files specified in MANIFEST.in
    install_requires=required,
    license_files = ("LICENSE"),
    python_requires=">=3.8",
)
